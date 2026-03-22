---
layout: home
title: Anime FFmpeg Re-Encoder - Free GPU Video Encoding
description: Automated anime encoding workflow for Google Colab. HEVC 10-bit with free GPU acceleration using NVENC. Download, encode, and upload to Google Drive automatically.
head:
  - - meta
    - name: keywords
      content: anime encoding, ffmpeg, hevc encoding, google colab, free gpu, nvenc, x265, video encoding, anime re-encoder
  - - meta
    - property: og:image
      content: https://syqrel.github.io/anime-encode/og-image.png

hero:
  name: "Anime FFmpeg Re-Encoder"
  text: "Encode anime in one Colab notebook."
  tagline: Download, encode, and upload with sensible defaults.
  actions:
    - theme: brand
      text: Start Here
      link: /quick-start
    - theme: alt
      text: Installation
      link: /installation
    - theme: alt
      text: Profiles
      link: /profiles

features:
  - title: Start fast
    details: Get the notebook running in a few minutes.
    icon: 🚀
  - title: Pick a profile
    details: Balanced, archival, mobile, or custom.
    icon: 🎛️
  - title: Let it run
    details: The notebook handles download, encode, and upload.
    icon: ▶️
---

## Why Use This?

<div class="vp-doc">

- **Fansubbers**: Consistent output for repeated releases.
- **Archivists**: Better quality per gigabyte.

</div>

## Tech Stack

- **FFmpeg 6.0**: Latest video processing libraries
- **NVENC**: NVIDIA Hardware Acceleration
- **x265**: Reference HEVC encoder
- **Opus**: High-quality audio codec
- **Python**: Automated workflow orchestration
