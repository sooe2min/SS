---
title: 우분투 (UBUNTU)
date: 2020-07-26
description: Ubuntu
---

# 우분투 (UBUNTU)

---

## [Google Chrome](https://www.google.com/intl/ko/chrome/)

크롬

## [mirror.kakao.com](http://mirror.kakao.com/ubuntu-releases/)

- `sudo sed -i 's/kr.archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list`

## 한글

- `sudo apt install fcitx-hangul`
- _Setting - Region & Language - Manage Installed Languages:_ **Install**
- _Language Support - Keyboard input method system:_ **IBus -> fcitx**
- _Fcitx Configuration - Add input method:_ **Hangul**
- _Fcitx Configuration - Global Config - Trigger input Method:_ **Hangul, Shift+Space**
- _Fcitx Configuration - Global Config - Extra key for trigger input method:_ **R_ALT**

## Git, Vim, curl, gnome-tweaks

```bash
sudo apt-get update
sudo apt-get install git vim curl gnome-tweaks
sudo apt-get upgrade -y
sudo apt-get autoremove -y
```

- [GNOME Extention](https://extensions.gnome.org/)
- Extensions / Dash to Dock / Ubuntu Dock / OpenWeather / User Themes

## zsh & oh-my-zsh

```bash
sudo apt install zsh -y
chsh -s `which zsh`
echo $SHELL
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

- `.zshrc`: ZSH_THEME="random"
- [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)

## Node Version Switcher

```bash
export NVS_HOME="$HOME/.nvs"
git clone https://github.com/jasongin/nvs "$NVS_HOME"
. "$NVS_HOME/nvs.sh" install
nvs add lts
nvs use lts
nvs link lts
```

## etc.

- VLC
- Gufw
- Transmission
- Pinta
- SimpleScreenRecorder
- Typora
- Visual Studio Code
- Slack
- Zoom
