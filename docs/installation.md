# Installation

This guide will help you set up the Anime FFmpeg Re-Encoder notebook in Google Colab.

## Prerequisites

Before you begin, ensure you have:

- [x] **Google Account** - For accessing Colab and Drive
- [x] **Google Drive** - With sufficient storage space
- [x] **Web Browser** - Chrome, Firefox, or Safari recommended

::: info No Local Installation Required
Everything runs in Google Colab's cloud environment. No software installation needed on your computer!

## Step 1: Upload Notebook to Google Drive

### Option A: Direct Upload

1. Download the notebook file: `Anime_FFmpeg_Re_Encoder_Notebook.ipynb`
2. Open [Google Drive](https://drive.google.com)
3. Navigate to your desired folder (e.g., `My Drive/Colab Notebooks/`)
4. Click **New** → **File upload**
5. Select the downloaded `.ipynb` file

### Option B: Clone from GitHub

```bash
# In Google Colab, run:
!git clone https://github.com/syqrel/anime-encode.git
```

## Step 2: Open in Google Colab

1. In Google Drive, right-click the `.ipynb` file
2. Select **Open with** → **Google Colaboratory**
3. If Colab isn't listed, click **Connect more apps** and search for "Colaboratory"

::: tip First Time Setup
If this is your first time using Colab, you may need to authorize the application to access your Google Drive.

## Step 3: Select Runtime

For optimal performance, configure your runtime:

### Free Tier Setup

1. Click **Runtime** → **Change runtime type**
2. Set **Hardware accelerator** to **GPU**
3. Click **Save**

![Runtime Settings](https://img.shields.io/badge/GPU-T4-green)

### Colab Pro Setup

1. Click **Runtime** → **Change runtime type**
2. Set **Hardware accelerator** to **GPU**
3. Set **GPU type** to **Premium** (for V100/A100)
4. Click **Save**

![Runtime Settings](https://img.shields.io/badge/GPU-V100/A100-blue)

::: warning Runtime Limitations
Free tier has usage limits:

- ~12 hours max runtime
- Sessions may disconnect during idle
- GPU allocation not guaranteed during peak hours

## Step 4: Mount Google Drive

Run the first cell to mount Google Drive:

```python
from google.colab import drive
drive.mount('/content/drive')
```

1. Click the **Play button** ▶️ on the cell
2. Click the authorization link
3. Select your Google account
4. Click **Allow** to grant permissions
5. Copy the authorization code
6. Paste it into Colab and press Enter

::: success Verification
You should see: `Mounted at /content/drive`

## Step 5: Install Dependencies

The notebook automatically installs required packages:

```python
!apt update -qq && apt install -y ffmpeg aria2 mkvtoolnix mediainfo -qq
!pip install tqdm -q
```

This installs:

- **FFmpeg** - Video encoding engine
- **aria2** - Download manager
- **mkvtoolnix** - MKV container tools
- **mediainfo** - Media file analysis
- **tqdm** - Progress bars

⏱️ Installation typically takes 1-2 minutes.

## Step 6: Verify Installation

Check if everything is installed correctly:

```python
!ffmpeg -version | head -n 1
!aria2c --version | head -n 1
!nvidia-smi  # Check GPU availability
```

Expected output:

```
ffmpeg version 4.4.2-0ubuntu0.22.04.1
aria2 version 1.36.0
```

For GPU verification:

```
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 525.85.12    Driver Version: 525.85.12    CUDA Version: 12.0     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  Tesla T4            Off  | 00000000:00:04.0 Off |                    0 |
| N/A   45C    P8    10W /  70W |      0MiB / 15360MiB |      0%      Default |
+-------------------------------+----------------------+----------------------+
```

## Folder Structure Setup

The notebook creates these folders automatically:

```
/content/
├── temp_downloads/          # Temporary download location
└── drive/
└── MyDrive/
└── Anime/
    └── Downloads/   # Final encoded output
```

You can customize these paths in the configuration cell:

```python
TEMP_DIR = "/content/temp_downloads"
DRIVE_OUTPUT_FOLDER = "/content/drive/MyDrive/Anime/Downloads"
```

## Troubleshooting Installation

### "No GPU available" error

If you see this error:

1. Go to **Runtime** → **Change runtime type**
2. Ensure **Hardware accelerator** is set to **GPU**
3. Click **Save** and wait for reconnection
4. If problem persists, try disconnecting and reconnecting

### "Permission denied" for Drive

1. Disconnect and reconnect runtime
2. Clear browser cache and cookies for `colab.research.google.com`
3. Remount Drive and re-authorize

### FFmpeg not found

```python
# Manually install FFmpeg
!apt update && apt install -y ffmpeg
```

### Slow installation

- This is normal on first run
- Colab caches packages for faster subsequent runs
- Consider upgrading to Colab Pro for faster provisioning

## Next Steps

Installation complete! Now you can:

- [Configure encoding settings](configuration.md)
- [Start your first encode](quick-start.md)
- [Explore encoding profiles](profiles.md)

---

::: question Need Help?
Check our [Troubleshooting Guide](troubleshooting.md) or [FAQ](faq.md)
