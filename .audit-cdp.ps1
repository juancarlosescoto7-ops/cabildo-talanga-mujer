param(
  [int]$Port = 9223,
  [string]$OutputDirectory = ".audit-slides",
  [switch]$CloseBrowserOnly,
  [switch]$InspectCurrentOnly,
  [int]$BackSteps = 0
)

$ErrorActionPreference = "Stop"
$targets = Invoke-RestMethod -Uri "http://127.0.0.1:$Port/json"
$target = @($targets) | Where-Object { $_.type -eq "page" } | Select-Object -First 1
if (-not $target) { throw "No browser page target found." }

New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null
$socket = [System.Net.WebSockets.ClientWebSocket]::new()
$cancellation = [System.Threading.CancellationToken]::None
$socket.ConnectAsync([Uri]$target.webSocketDebuggerUrl, $cancellation).GetAwaiter().GetResult()
$nextId = 0

function Send-CdpCommand {
  param([string]$Method, [hashtable]$Parameters = @{})

  $script:nextId += 1
  $commandId = $script:nextId
  $payload = @{ id = $commandId; method = $Method; params = $Parameters } | ConvertTo-Json -Depth 12 -Compress
  $bytes = [Text.Encoding]::UTF8.GetBytes($payload)
  $socket.SendAsync([ArraySegment[byte]]::new($bytes), [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cancellation).GetAwaiter().GetResult()

  while ($true) {
    $stream = [IO.MemoryStream]::new()
    do {
      $buffer = New-Object byte[] 1048576
      $received = $socket.ReceiveAsync([ArraySegment[byte]]::new($buffer), $cancellation).GetAwaiter().GetResult()
      $stream.Write($buffer, 0, $received.Count)
    } while (-not $received.EndOfMessage)

    $message = [Text.Encoding]::UTF8.GetString($stream.ToArray()) | ConvertFrom-Json
    if ($message.id -eq $commandId) {
      if ($message.error) { throw $message.error.message }
      return $message.result
    }
  }
}

function Evaluate-Page {
  param([string]$Expression)
  return Send-CdpCommand "Runtime.evaluate" @{ expression = $Expression; returnByValue = $true; awaitPromise = $true }
}

if ($CloseBrowserOnly) {
  Send-CdpCommand "Browser.close" | Out-Null
  $socket.Dispose()
  exit
}

Send-CdpCommand "Page.enable" | Out-Null
Send-CdpCommand "Runtime.enable" | Out-Null
Send-CdpCommand "Emulation.setDeviceMetricsOverride" @{ width = 1920; height = 1080; deviceScaleFactor = 1; mobile = $false } | Out-Null

if ($InspectCurrentOnly) {
  for ($step = 0; $step -lt $BackSteps; $step += 1) {
    Evaluate-Page "document.querySelector('.navigation-zone--previous')?.click(); true" | Out-Null
    Start-Sleep -Milliseconds 1200
  }
  Start-Sleep -Milliseconds 2200
  $inspection = Evaluate-Page "JSON.stringify({title:document.querySelector('h1')?.innerText || '', small:(()=>{const e=document.querySelector('.financial-progress-heading > strong small');if(!e)return null;const s=getComputedStyle(e);return {text:e.textContent,display:s.display,font:s.font,fontSize:s.fontSize,lineHeight:s.lineHeight}})(), marker:(()=>{const e=document.querySelector('.financial-progress-marker');if(!e)return null;const s=getComputedStyle(e);return {left:s.left,opacity:s.opacity,height:s.height}})(), overflowX:document.documentElement.scrollWidth-document.documentElement.clientWidth, overflowY:document.documentElement.scrollHeight-document.documentElement.clientHeight})"
  $capture = Send-CdpCommand "Page.captureScreenshot" @{ format = "png"; captureBeyondViewport = $false; fromSurface = $true }
  [IO.File]::WriteAllBytes((Resolve-Path $OutputDirectory).Path + "\current.png", [Convert]::FromBase64String($capture.data))
  $inspection.result.value
  $socket.Dispose()
  exit
}

$selectedSlides = @(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,18,22,25,28,31,32,33,34,35,36,37)
$metadata = @()

for ($slide = 0; $slide -le 37; $slide += 1) {
  $state = Evaluate-Page "JSON.stringify({title:document.querySelector('h1')?.innerText || '', kicker:document.querySelector('.information-kicker')?.innerText || '', overflowX:document.documentElement.scrollWidth-document.documentElement.clientWidth, overflowY:document.documentElement.scrollHeight-document.documentElement.clientHeight, overlay:Boolean(document.querySelector('[data-nextjs-dialog]'))})"
  $metadata += [pscustomobject]@{ Slide = $slide; State = ($state.result.value | ConvertFrom-Json) }

  if ($selectedSlides -contains $slide) {
    $capture = Send-CdpCommand "Page.captureScreenshot" @{ format = "png"; captureBeyondViewport = $false; fromSurface = $true }
    $path = Join-Path $OutputDirectory ("slide-{0:d2}.png" -f $slide)
    [IO.File]::WriteAllBytes((Resolve-Path $OutputDirectory).Path + "\" + [IO.Path]::GetFileName($path), [Convert]::FromBase64String($capture.data))
  }

  if ($slide -lt 37) {
    Evaluate-Page "document.querySelector('.navigation-zone--next')?.click(); true" | Out-Null
    Start-Sleep -Milliseconds 1200
  }
}

$metadata | ConvertTo-Json -Depth 5
$socket.Dispose()
