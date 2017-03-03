_bin = ./node_modules/.bin/
_bin=/bin

install:
	npm install
	cp .env-example .env

server-prod:
	# init forever
	@${_bin}forever start index.js

server-dev:
	# init nodemon
	@${_bin}nodemon index.js


############################
# CEC install commands
############################
cec-install-dep:
	sudo apt-get update
	sudo apt-get install -y cmake libudev-dev libxrandr-dev python-dev swig

cec-install-platform:
	git clone https://github.com/Pulse-Eight/platform.git ${HOME}/platform
	mkdir ${HOME}/platform/build
	cd ${HOME}/platform/build && cmake ..
	cd ${HOME}/platform/build && make
	cd ${HOME}/platform/build && sudo make install

cec-install-libcec:
	git clone https://github.com/Pulse-Eight/libcec.git ${HOME}/libcec
	mkdir ${HOME}/libcec/build
	cd ${HOME}/libcec/build && cmake -DRPI_INCLUDE_DIR=/opt/vc/include -DRPI_LIB_DIR=/opt/vc/lib ..
	cd ${HOME}/libcec/build && make -j4
	cd ${HOME}/libcec/build && sudo make install
	cd ${HOME}/libcec/build && sudo ldconfig

install-cec: cec-install-platform cec-install-libcec