# https://phoenixnap.com/kb/install-kubernetes-on-ubuntu


sudo apt update
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl status docker
sudo systemctl start docker

#adding repo
curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo tee /usr/share/keyrings/kubernetes.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/kubernetes.gpg] http://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list

#package installing package from the above added repo
sudo apt update

# installing kubernetes tools
sudo apt install kubeadm kubelet kubectl
sudo apt-mark hold kubeadm kubelet kubectl
kubeadm version

kubeadm join 10.25.1.79:6443 --token iwi8m1.juzpcw53hcsk1aho \
	--discovery-token-ca-cert-hash sha256:ccb096f681e571b06b6caad4ec73b14475de75e4a086cf014a4b9551e3267a52


