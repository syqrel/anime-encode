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
  text: "Automated encoding workflow for Google Colab"
  tagline: Professional-grade HEVC 10-bit quality with free GPU acceleration
  actions:
    - theme: brand
      text: Get Started
      link: /quick-start
    - theme: alt
      text: View on GitHub
      link: https://github.com/syqrel/anime-encode

features:
  - title: Automated Download
    details: aria2 multi-threaded torrent & direct downloads with 16 connections optimization.
    icon: ⬇️
  - title: HEVC 10-bit Encoding
    details: High-fidelity encoding using NVENC (GPU) or x265 (CPU) with 10-bit color depth.
    icon: 🎞️
  - title: Quality Profiles
    details: Pre-configured presets from 360p mobile to 1080p high-bitrate archive quality.
    icon: 🎨
  - title: Google Drive Sync
    details: Automatically uploads finished encodes to your Drive. No local storage needed.
    icon: ☁️
  - title: GPU Accelerated
    details: Leverage Google Colab's free T4 GPUs for blazing fast hardware encoding.
    icon: ⚡
  - title: Auto Shutdown
    details: Smart runtime management to save your Colab compute units after tasks finish.
    icon: ⏱️
---

## Why Use This?

<div class="vp-doc">

### 🚀 For Fansubbers
- **Consistent Quality**: Standardize your releases with unified encoding settings.
- **Batched Workflow**: Process entire seasons in the background.

### 🏛️ For Archivists
- **Save Space**: 30-50% size reduction compared to H.264 sources.
- **Preserve Quality**: 10-bit depth prevents color banding in anime gradients.

</div>

## Tech Stack

- **FFmpeg 6.0**: Latest video processing libraries
- **NVENC**: NVIDIA Hardware Acceleration
- **x265**: Reference HEVC encoder
- **Opus**: High-quality audio codec
- **Python**: Automated workflow orchestration

<style>
/* Custom tweaks for the home page content if needed */
.vp-doc h3 {
  margin-top: 2rem;
}
</style>
