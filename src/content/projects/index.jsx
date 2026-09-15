const projectsData = [
  {
    id: 'serve-pcb-probing',
    title: 'Serve Robotics PCB Probing Station',
    shortDescription:
      'Remote PCB debugging from a web UI — Kinova Gen2 arm control, live camera, and telemetry so firmware engineers don’t wait on multi-week board shipping.',
    labels: ['Robotics & Embedded Systems'],
    tags: ['React', 'FastAPI', 'Kinova', 'OpenCV', 'WebSockets'],
    image: '/images/projects/serve-pcb-probing.png',
    detailImage: '/images/projects/serve-pcb-probing-detail.png',
    github: 'https://github.com/ryannaini/ServeRobotics-pcb-probe-station',
    fullContent: (
      <>
        <p>
          Remote PCB debugging platform for probing in-house boards from a web
          UI — Kinova Gen2 arm control, live camera stream, and telemetry — so
          firmware engineers don’t wait on multi-week board shipping. Built for
          hardware/software integration work at Serve Robotics.
        </p>
        <h3 className="mt-5 font-display text-lg text-ink">Architecture</h3>
        <p className="mt-2">
          React (Vite) talks to a FastAPI backend over REST, WebSockets, and
          MJPEG. The backend bridges a Kinova C++ arm daemon (stdin/stdout), a
          USB camera pipeline (OpenCV), and relay/I/O control — driving the
          Kinova Gen2 over Ethernet.
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li>
            <span className="text-ink">C++</span> — Kinova robot daemon using
            Kinova APIs
          </li>
          <li>
            <span className="text-ink">Python</span> — FastAPI + subprocess
            bridge to the arm, camera stream, and optics
          </li>
          <li>
            <span className="text-ink">React</span> — dashboard with live video,
            pose telemetry, jog / WASD, and focus controls
          </li>
        </ul>
        <h3 className="mt-5 font-display text-lg text-ink">Features</h3>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>Arm initialize, home, and XY jog (D-pad + WASD hold-to-move)</li>
          <li>Live Cartesian pose over WebSocket</li>
          <li>MJPEG camera preview in the dashboard</li>
          <li>Autofocus toggle and manual focus step</li>
          <li>In/Out (Z) UI control</li>
          <li>CORS-enabled API for local frontend development</li>
        </ul>
      </>
    ),
  },
  {
    id: 'ublox-antenna-monitoring',
    title: 'Ublox GPS Antenna Monitoring',
    shortDescription:
      'Live UBX antenna health checks on Jetson Orin: parse MON-RF over serial to catch shorts, opens, and power issues before GPS silently fails.',
    labels: ['Robotics & Embedded Systems'],
    tags: ['Jetson Orin', 'Ublox', 'Python', 'UBX'],
    image: '/images/projects/zed-f9p-antenna.png',
    detailImage: '/images/projects/zed-f9p-antenna.png',
    fillDetailImage: true,
    fullContent: (
      <>
        <p>
          During integration work on a Jetson Orin platform with a Ublox GPS
          module, I built a lightweight way to monitor antenna health directly
          from the serial stream. GPS messages alone can look fine even when the
          antenna path is shorted, open, or unpowered, so the useful signal is
          in the module&apos;s UBX-MON-RF diagnostics.
        </p>
        <p>
          I wrote a small Python parser that reads raw bytes from
          /dev/ttyTHS0, finds MON-RF packets, and prints each antenna
          block&apos;s ANT_STATUS and ANT_POWER in plain language (OK, SHORT,
          OPEN, and whether power is on). That made short detection and
          open-circuit checks something I could verify live on the robot
          without a heavy tooling stack.
        </p>
        <p>
          Along the way I also worked through Orin service control
          (supervisorctl), GPS reset and reconfigure flows, and how antenna
          voltage, polarity, and auto-recovery settings fit together. The
          takeaway was a practical debugging habit: separate module
          communication from antenna electrical health, then prove each one
          independently.
        </p>
      </>
    ),
  },
  {
    id: 'audio-spectrum-visualizer',
    title: 'Audio Spectrum Visualizer',
    shortDescription:
      'Real-time hardware audio display — analog band-pass filters, ESP32 ADC sampling, and an 8×8 LED matrix driven by shift registers.',
    labels: ['Robotics & Embedded Systems'],
    tags: ['ESP32', 'C++', 'Analog Filtering', 'LED Matrix'],
    image: '/images/projects/audio-spectrum-card.jpg',
    video: '/videos/audio-spectrum.mov',
    detailImages: [
      '/images/projects/audio-spectrum-code-1.png',
      '/images/projects/audio-spectrum-code-2.png',
    ],
    stackDetailImages: true,
    fullContent: (
      <>
        <p>
          The Analog Audio Spectrum Visualizer is a real-time, hardware-driven
          audio display for an 8×8 LED matrix. The system takes microphone input
          and routes it through four analog band-pass filters that split the
          spectrum (≈20 Hz–5 kHz) into low, low-mid, high-mid, and high bands.
          An ESP32 samples each band with the ADC, smooths the signals with a
          short moving-average, then maps amplitudes to LED “bar” heights.
        </p>
        <p>
          I wrote the firmware in C++ (Arduino) and drove the matrix with dual
          serial shift registers — one bank selects rows (p-MOS) and the other
          gates columns (n-MOS). A hardware-timer ISR multiplexes the display
          at a fixed refresh for flicker-free output while the main loop updates
          column heights in real time.
        </p>
        <p>
          The result is a compact pipeline — analog filtering → ADC → C++
          processing → timed LED scanning via shift registers — that turns sound
          into a clean, interpretable visualization and showcases integrating
          analog design, embedded programming, and digital hardware control in
          one cohesive system. Click the video above to see a classic song being
          visualized!
        </p>
      </>
    ),
  },
  {
    id: 'fsae-aero-rake',
    title: 'FSAE Aero Rake / Strain Gauge DAQ',
    shortDescription:
      'Strain-gauge and airspeed PCB firmware for Northwestern Formula — real-time load monitoring, Pitot airspeed, and CAN telemetry.',
    labels: ['Robotics & Embedded Systems'],
    tags: ['C/C++', 'CAN', 'I2C', 'ESP32', 'Altium'],
    image: '/images/projects/fsae-pcb-layout.png',
    detailImages: [
      '/images/projects/fsae-strain-gauge-board.png',
      '/images/projects/fsae-airspeed-board.png',
    ],
    rotateDetailImages: 90,
    pdf: '/docs/fsae-strain-gauge-schematic.pdf',
    github: 'https://github.com/ryannaini/Nu-Formula-Racing-Shervin-Naini',
    fullContent: (
      <>
        <p>
          Firmware for Northwestern Formula Racing’s strain-gauge and airspeed
          sensing boards — real-time chassis/suspension load monitoring and
          Pitot-static airspeed over CAN.
        </p>
        <h3 className="mt-5 font-display text-lg text-ink">
          Strain Gauge Integration &amp; Signal Conditioning
        </h3>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>
            Firmware interface to high-resolution ADCs for real-time chassis and
            suspension load monitoring
          </li>
          <li>
            I²C communication with onboard ADCs, using hardware interrupts for
            consistent sampling rates
          </li>
          <li>
            Zero-offset calibration for pre-run sequences to correct ambient
            thermal drift
          </li>
        </ul>
        <h3 className="mt-5 font-display text-lg text-ink">
          Pitot Tube &amp; Airspeed Processing
        </h3>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>
            Driver for the differential pressure sensor in the Pitot-static
            system
          </li>
          <li>
            Bernoulli-based conversion from raw pressure differentials to knots
            and m/s
          </li>
          <li>
            Altitude compensation using ambient temperature and atmospheric
            pressure
          </li>
        </ul>
        <h3 className="mt-5 font-display text-lg text-ink">CAN Bus Architecture</h3>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>
            CAN frame design for broadcasting strain and airspeed telemetry
          </li>
          <li>
            Message ID prioritization for critical aero/structural data
          </li>
          <li>
            Timestamp sync with the central logger for post-run correlation
          </li>
        </ul>
        <h3 className="mt-5 font-display text-lg text-ink">Technical Stack</h3>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>Languages: C, C++ (embedded)</li>
          <li>Protocols: CAN, I²C</li>
          <li>Hardware: ESP32, differential pressure sensors, strain-gauge ADCs</li>
          <li>Design: PCB design in Altium Designer</li>
        </ul>
      </>
    ),
  },
  {
    id: 'oxford-countgd',
    title: 'Oxford ML — CountGD Benchmarking',
    shortDescription:
      'Oxford ML research building benchmarking tools, hierarchical classification trees, and dataset references around CountGD.',
    labels: ['ML / Research'],
    tags: ['Machine Learning', 'Benchmarking'],
    image: '/images/projects/oxford-countgd.jpg',
    detailImage: '/images/projects/oxford-countgd.jpg',
    fullContent: (
      <>
        <p>
          At Oxford ML I worked on tools and evaluation around CountGD, my PhD
          mentor’s counting model. I built a reusable Python benchmarking
          framework so we could compare different counting architectures against
          CountGD across public and internal datasets, and broaden how many
          models we could evaluate in a consistent way.
        </p>
        <p>
          I also put together a hierarchical classification tree from thousands
          of images, with queryable text-prompt nodes at each level of
          granularity. That structure helped the model tell apart closely
          related, visually similar objects that used to blur together.
        </p>
        <p>
          Separately, I researched and catalogued multi-species video and image
          counting datasets by class density, annotation type, and video length,
          and organized them into a shared spreadsheet the team could use when
          choosing what to evaluate next.
        </p>
      </>
    ),
  },
  {
    id: 'eeg-alzheimers',
    title: "Alzheimer's EEG Classification",
    shortDescription:
      'Binary AD vs. healthy classification from resting-state EEG using spectral band-power features and classical ML.',
    labels: ['ML / Research'],
    tags: ['Machine Learning', 'EEG', 'scikit-learn', 'MNE'],
    image: '/images/projects/eeg-alzheimers-dashboard.png',
    detailImages: [
      '/images/projects/eeg-alzheimers-dashboard.png',
      '/images/projects/eeg-alzheimers-roc.png',
    ],
    github: 'https://github.com/ryannaini/eeg-classification-alzheimers',
    fullContent: (
      <>
        <p>
          I built a pipeline to classify Alzheimer&apos;s Disease vs. healthy
          controls from resting-state scalp EEG, using the OpenNeuro DS004504
          dataset (65 subjects, 19 channels, eyes-closed). The goal was to turn
          messy brainwave recordings into features a model could actually learn
          from.
        </p>
        <p>
          After band-pass filtering and PSD extraction with Welch&apos;s method,
          I averaged absolute power across channels into five canonical bands
          (delta through gamma) and also computed relative power so subjects
          with different skull/electrode conditions could be compared fairly.
          Stratified 5-fold cross-validation with sklearn Pipelines kept
          preprocessing inside each training fold to avoid leakage.
        </p>
        <p>
          Random Forest and RBF SVC both landed around the low-to-mid 70s in
          accuracy. Looking at feature importances, theta and alpha drove most
          of the decisions, which lines up with the clinical idea of EEG
          slowing in Alzheimer&apos;s. Along the way I got a real feel for
          artifact cleaning, signal-to-feature work, and why small medical
          datasets need careful validation.
        </p>
      </>
    ),
  },
  {
    id: 'infinity-button',
    title: 'The Infinity Button',
    shortDescription:
      'A two-button microwave interface for people with developmental disabilities — consistent timing, clear food labels, safer independent use.',
    labels: ['Accessibility-Driven Design'],
    tags: ['Raspberry Pi Pico', 'CircuitPython', 'Accessibility'],
    image: '/images/projects/infinity-button-card.jpg',
    videos: [
      '/videos/infinity-button-1.mov',
      '/videos/infinity-button-2.mp4',
    ],
    fullContent: (
      <>
        <p>
          My second college design project, created for my Design Thinking and
          Communication class, is a simplified microwave interface called the
          Infinity Button, designed for individuals with developmental
          disabilities. We were challenged to redesign existing products using
          human-centered principles to promote safety, accessibility, and
          independence.
        </p>
        <p>
          I removed the standard microwave control panel and replaced it with a
          custom two-button control system. Using a Raspberry Pi Pico
          microcontroller, CircuitPython, and circuit rewiring, I programmed two
          tactile buttons: one for 30 seconds and one for 1 minute. Each button
          delivers a consistent time regardless of repeated presses, reducing
          confusion and preventing overheating. Common food items were clearly
          labeled below each button to guide usage.
        </p>
        <p>
          This redesign creates a safer, more intuitive microwave experience that
          empowers users at the agency we partnered with, North Center for
          Handicapped, to heat their meals independently.
        </p>
      </>
    ),
  },
]

export default projectsData
