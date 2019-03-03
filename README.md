# README

# Dev Environment setup

#### set up virtual machine & vagrant
1. Download & install Virtual Box
2. Download & install Vagrant (see below for some commands)
3. Clone the git repository to some directory
4. use `vagrant ssh` when within the directory in your terminal to enter the vm
5. the project directory is mounted at `/vagrant`
6. `cd scripts/init_machine`
7. execute the init_machine script
8. if necessary, run `npm install`

#### Set up ssh config file
	```
	Host my-server
	    HostName <ip address>
	    User ubuntu
	    Port 22
	    IdentityFile "~/.ssh/<file containing your ssh key>"
	```
	- notes
		- ubuntu is default username for an ubuntu EC2 instance
	- you can now connect via 'ssh my-server'
	- IdentityFile may be unnecessary if you get your usual public key into the
	  authorized keys section of the server
	- you can call Host whatever you want, its just a name for your own use


# Initial Server set up
Note that autoscaling will do this for us after we make an AMI

1. create ec2 instance (t2 micro or other cheap type)
2. security groups:
	- allow http/https from everywhere
	- allow ssh from anywhere (for now)
	- allow icmp for echo requests (so ping works during testing)
3. vpc
	- use the default one (for now)
4. use rsync to transfer the code over
	- `rsync -avzhe ssh my-server/ my-server:/opt/app`
	- note: may require a manual step
5. go to init machine directory, THEN execute init machine.sh

# Appendix

#### Starting and Stopping things

Start the server in server mode: `npm run serve`
	- you can ctrl-c out of this a few seconds later since its using a module
	  called 'forever' to run

Start the server in local dev mode (use this except for prod server)
	- `npm start`

#### some vagrant commands

`vagrant up` - start a vm

`vagrant halt` - force stop vm without deleting it

`vagrant suspend` - like halt, but graceful and not forced

`vagrant ssh` - ssh into a vm

`vagrant destroy` - delete a vm

`vagrant status` -get status of vms
