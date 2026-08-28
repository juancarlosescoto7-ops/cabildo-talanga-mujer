# Guía de diseño para presentaciones centradas en la mujer

## Propósito

Esta guía reúne el lenguaje visual desarrollado para el **III Cabildo Abierto Sector Mujer**. Su objetivo es servir como base reutilizable para futuras presentaciones institucionales relacionadas con mujeres, liderazgo, participación ciudadana, autonomía y transformación social.

La propuesta debe comunicar una feminidad poderosa y contemporánea sin caer en estereotipos infantiles, decorativos, frágiles o excesivamente corporativos.

## Idea rectora

La mujer no se presenta como un objeto que debe mostrarse por completo. Su presencia se construye mediante fragmentos, luz, movimiento, textura y composición.

La experiencia debe sentirse:

- Serena, pero no pasiva.
- Femenina, pero no infantilizada.
- Institucional, pero no rígida.
- Poderosa, sin recurrir a una estética agresiva.
- Abstracta, sin perder humanidad.
- Elegante, sin incorporar decoración innecesaria.

## Tratamiento de las imágenes

### Dirección fotográfica

- Utilizar siluetas, perfiles, manos, espalda, cabello, hombros y otros encuadres cercanos no sexualizados.
- Evitar retratos frontales demasiado explícitos cuando la intención sea mantener la abstracción.
- Integrar flores, mariposas y elementos naturales como símbolos secundarios, nunca como ornamentos infantiles.
- Mantener coherencia de iluminación, color, textura y atmósfera entre todas las imágenes.
- Reservar zonas de aire dentro de la fotografía para alojar el contenido editorial.

### Encuadre en pantalla

- Respetar la composición original de la imagen.
- Evitar ampliaciones agresivas que eliminen detalles importantes.
- En formatos equivalentes a 16:9, mantener la imagen centrada y con un zoom ambiental mínimo.
- El movimiento de cámara debe ser casi imperceptible: aproximadamente entre `1.005` y `1.035` de escala.
- Los desplazamientos deben ser lentos, cortos y continuos.

## Composición

- Usar proporción áurea o relaciones visuales cercanas a ella para distribuir imagen y texto.
- No centrar automáticamente todos los elementos.
- Permitir que la figura femenina cambie de lado entre escenas.
- Colocar los títulos en las áreas de respiración de la fotografía.
- Favorecer composiciones asimétricas equilibradas.
- Evitar líneas, marcos, etiquetas, frases auxiliares y referencias institucionales redundantes.

## Color

### Paleta principal

- Coral luminoso: `#FFD8D0`
- Coral medio: `#FFA99A`
- Lavanda rosada: `#E7A0D0`
- Orquídea: `#C36CA4`
- Morado profundo: `#8F3A7C`

### Criterio de aplicación

- El coral aporta cercanía y energía.
- El lavanda conecta los extremos claros y profundos.
- El morado aporta autoridad, profundidad y capacidad.
- Los tonos claros deben mejorar el contraste sobre fondos oscuros.
- El color no debe presentarse como un degradado lineal evidente, circular o cónico.

### Textura cromática

Utilizar una textura orgánica compuesta por formas curvas, amplias y difuminadas. Los colores no deben converger en un centro ni producir rayos o picos.

En la implementación actual, la textura reutilizable se encuentra en:

`/public/images/cabildo-mujer/liquid-ink-soft.svg`

## Tipografía

### Títulos expresivos

- Usar una tipografía editorial con personalidad y contraste.
- En esta presentación se utiliza **Fraunces Variable** para los títulos de mayor carga emocional.
- Aprovechar sus ejes variables para obtener una voz orgánica, contemporánea y menos corporativa.
- Mantener tamaños grandes, interletraje cerrado y composición segura.

### Información institucional

- Usar tipografías sobrias y legibles para datos concretos.
- En esta presentación se utilizan **Archivo Variable** y **Manrope Variable**.
- Reservarlas para subtítulos funcionales, cifras, controles o información institucional.

## Logo institucional

- Utilizar el SVG original como elemento independiente.
- Evitar incrustarlo dentro de una imagen generada.
- Mantenerlo pequeño, discreto y con suficiente aire alrededor.
- Aplicar la misma textura coral–lavanda–morada utilizada en los títulos.
- Reducir su opacidad para integrarlo sin competir con la imagen.
- No repetir el logo en todas las escenas salvo que exista una necesidad institucional real.

## Sistema de movimiento

El movimiento se divide en tres momentos.

### 1. Entrada de la escena

- La imagen y el contenido aparecen mediante opacidad, desplazamiento corto y desenfoque suave.
- La transición no debe sentirse como una diapositiva tradicional.
- La duración debe permitir que la composición se revele sin retrasar la lectura.

### 2. Reflexión inicial

- Después de aparecer el título, una luz amplia debe recorrer las letras una sola vez.
- La reflexión representa una superficie viva que recibe luz; no un destello metálico agresivo.
- No utilizar franjas estrechas, blancos duros, rayos, picos ni pulsos súbitos.
- El reflejo debe tener bordes difusos y una curva de aceleración suave.
- Cada elemento debe tener una coreografía propia:

  - El logo recibe una reflexión diagonal y contenida.
  - El número puede reflejar desde la derecha.
  - El título institucional puede reflejar desde el sentido opuesto y con un ligero retraso.
  - El título principal puede recibir una reflexión vertical o diagonal más amplia.

### 3. Movimiento ambiental

- Después del reflejo, la textura de color continúa desplazándose lentamente dentro de las letras.
- No limitar el movimiento a una simple ida y vuelta.
- Usar recorridos con varios puntos amplios y porcentajes temporales desiguales.
- El inicio y el final del ciclo deben coincidir para evitar saltos.
- Utilizar duraciones diferentes y suficientemente largas para reducir la sensación de repetición.
- Mantener curvas `ease-in-out` para preservar serenidad y continuidad.

## Variabilidad sin aleatoriedad agresiva

La experiencia puede ser variable sin recurrir a movimientos impredecibles o bruscos.

- Cambiar la dirección del reflejo entre escenas.
- Variar la duración, el retraso y la amplitud del recorrido.
- Usar ciclos ambientales de distinta duración.
- Evitar que dos títulos alcancen su punto más luminoso al mismo tiempo.
- No utilizar cambios aleatorios de color, escala o posición en cada fotograma.
- La variación debe parecer una coreografía editorial, no ruido visual.

## Navegación de la presentación

La presentación debe permitir avanzar y retroceder mediante:

- Rueda o gesto de desplazamiento.
- Clic en las zonas laterales.
- Flechas del teclado.
- `Enter`, barra espaciadora y `Page Down` para avanzar.
- `Backspace` y `Page Up` para retroceder.
- `Home` y `End` para ir al inicio o al final.
- Gestos táctiles horizontales.

Todos los cambios deben conservar la posibilidad de regresar a escenas anteriores.

## Accesibilidad y comodidad

- Respetar `prefers-reduced-motion`.
- Mantener suficiente contraste entre texto y fotografía.
- No depender exclusivamente del color para comunicar jerarquía.
- Mantener nombres accesibles para el logo y los controles.
- Evitar animaciones rápidas, parpadeos y cambios intensos de luminancia.

## Elementos que deben evitarse

- Esculturas o figuras tridimensionales genéricas.
- Mujeres mostradas como objetos decorativos.
- Imágenes sexualizadas.
- Rosas infantiles o paletas excesivamente dulces.
- Verde corporativo como color dominante.
- Logos gigantes o fusionados artificialmente con la fotografía.
- Degradados cónicos que produzcan rayos o picos.
- Brillos blancos estrechos y agresivos.
- Movimientos erráticos o demasiado rápidos.
- Zoom excesivo sobre las imágenes.
- Textos auxiliares, frases inspiracionales o referencias institucionales innecesarias.
- Composiciones simétricas por defecto.

## Estructura narrativa recomendada

La portada puede resolverse como un ciclo de tres momentos dentro de una misma vista:

1. Una fotografía oscurecida presenta únicamente el logo institucional, completamente centrado y con una reflexión suave.
2. Una segunda fotografía oscurecida presenta “III CABILDO ABIERTO”, también totalmente centrado.
3. La tercera fotografía recupera su color y luminosidad natural para presentar “MUJER”.
4. La palabra principal —en este caso, **MUJER**— domina la jerarquía y constituye la revelación luminosa del ciclo.
5. Cada fase permanece visible durante varios segundos antes de fundirse con la siguiente.
6. Después de “MUJER”, el ciclo regresa suavemente al logo.
7. El ciclo continúa mientras la portada sea la vista activa.
8. El desarrollo posterior utiliza nuevas imágenes y composiciones para cada bloque de contenido.

El logo, el nombre del evento y “MUJER” son fases temporales de una misma portada, no diapositivas independientes. Las escenas posteriores deben aportar contenido o una nueva perspectiva narrativa real.

### Composición aplicada en la portada actual

- Primera fotografía: `08-perfil-luz-coral.png`, oscurecida para el logo.
- Segunda fotografía: `02-hombro-mariposa.png`, oscurecida para “III CABILDO ABIERTO”.
- Tercera fotografía: `06-flores-espalda.png`, mostrada con su color natural para “MUJER”.
- Alineación: todos los elementos se centran horizontal y verticalmente en su fase correspondiente.
- Fase inicial: logo municipal horizontal completamente centrado, respetando su proporción original `1000:291.12`.
- Segunda fase: “III” y “CABILDO ABIERTO” tratados como dos niveles consecutivos y centrados.
- Tercera fase: “MUJER” en el mayor formato tipográfico y con el fondo completamente iluminado.
- Secuencia lumínica: oscuridad contenida, transición intermedia y revelación del color natural.
- Movimiento posterior: cada elemento mantiene un ciclo cromático propio, lento y continuo.
- Duración actual del ciclo completo: `18s`.

## Recursos actuales

- Logo: `/public/images/municipalidad/logo-municipal.svg`
- Textura cromática: `/public/images/cabildo-mujer/liquid-ink-soft.svg`
- Serie visual: `/public/images/cabildo-mujer/series/`
- Fondo de “Motivo de la presentación”: `/public/images/cabildo-mujer/series/09-motivo-tejido-colectivo.png`
- Estilos y animaciones: `/app/globals.css`
- Estructura de títulos: `/components/cabildo-mujer/IntroOverlay.tsx`
- Primera slide informativa: `/components/cabildo-mujer/MotivoSlide.tsx`
- Experiencia, paralaje y pantalla completa: `/components/cabildo-mujer/CabildoMujerExperience.tsx`

## Patrón para slides informativas

Las slides posteriores a la portada conservan la atmósfera visual, pero cambian su jerarquía para facilitar la lectura.

- Utilizar una fotografía nueva y relacionada con el contenido de cada slide.
- Reservar espacio negativo real dentro de la fotografía para el bloque editorial.
- Oscurecer localmente el área de lectura sin ocultar por completo la imagen.
- Mantener un título expresivo con la textura cromática de la portada, pero a menor escala.
- Dimensionar los títulos con el texto real, no con una frase de ejemplo: usar ancho máximo seguro, interlineado no menor a `0.94`, espacio interno para ascendentes y descendentes y `overflow: visible`.
- Cuando exista una capa duplicada para el reflejo, su caja debe respetar exactamente el mismo espacio interno del título para evitar cortes o desalineación.
- En móvil, reducir la escala antes de permitir que un título ocupe demasiadas líneas o salga del área segura de la slide.
- Usar Archivo o Manrope para el contenido explicativo.
- Limitar cada slide a una idea principal, un párrafo breve y hasta tres puntos de apoyo.
- Evitar tarjetas, cajas, gráficos decorativos y estructuras de dashboard.
- Aplicar una sola reflexión inicial al título; después conservar únicamente el movimiento cromático ambiental.
- Permitir navegación reversible mediante clic en las mitades izquierda y derecha de la pantalla.

### Primera aplicación: Motivo de la presentación

- Imagen: manos de mujeres trabajando colectivamente un tejido.
- Composición: sujeto en el tercio derecho y contenido en el espacio negativo izquierdo.
- Mensaje principal: dar a conocer que la administración actual brinda un espacio municipal para las mujeres y reafirmar el compromiso de fortalecerlo y cumplir este objetivo.
- Estructura: título editorial, párrafo contextual y tres propósitos breves.

## Instrucción base para reutilización

> Diseña una presentación editorial inmersiva centrada en la mujer. Utiliza imágenes abstractas y no sexualizadas, encuadres cercanos y composiciones asimétricas basadas en proporciones armónicas. Combina coral, lavanda y morado profundo mediante texturas orgánicas sin centros, rayos ni degradados lineales evidentes. Usa títulos expresivos y datos institucionales sobrios. Al entrar cada escena, aplica una reflexión amplia y difusa diferente; después, conserva un movimiento cromático lento, sereno y continuo. La experiencia debe comunicar capacidad, presencia y poder sin resultar agresiva, infantil o excesivamente corporativa.

## Lista de control para futuras presentaciones

- [ ] ¿La imagen representa a la mujer sin sexualizarla ni reducirla a un estereotipo?
- [ ] ¿La composición utiliza el espacio de manera asimétrica y deliberada?
- [ ] ¿El encuadre conserva los detalles importantes de la imagen?
- [ ] ¿El color comunica fuerza y cercanía sin parecer infantil?
- [ ] ¿Los degradados carecen de centros, rayos o picos visibles?
- [ ] ¿Cada escena tiene una reflexión distinta y suave?
- [ ] ¿El movimiento posterior es lento, continuo y no repetitivo a simple vista?
- [ ] ¿Se eliminaron líneas, frases y elementos institucionales innecesarios?
- [ ] ¿La navegación permite avanzar y retroceder con distintos dispositivos?
- [ ] ¿La experiencia respeta la reducción de movimiento?
