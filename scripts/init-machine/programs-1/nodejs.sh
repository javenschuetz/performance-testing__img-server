echo
# echo "installing nodejs via snap..."
# sudo snap install node --channel=10/stable --classic
echo installing nodejs
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
