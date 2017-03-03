_bin = ./node_modules/.bin/

install:
	npm install
	cp .env-example .env

server-prod:
	# init forever
	@${_bin}forever start index.js

server-dev:
	# init nodemon
	@${_bin}nodemon index.js

install-cec:
	sudo apt-get update
	sudo apt-get install cmake libudev-dev libxrandr-dev python-dev swig
	cd
	git clone https://github.com/Pulse-Eight/platform.git
	mkdir platform/build
	cd platform/build
	cmake ..
	make
	sudo make install
	cd
	git clone https://github.com/Pulse-Eight/libcec.git
	mkdir libcec/build
	cd libcec/build
	cmake -DRPI_INCLUDE_DIR=/opt/vc/include -DRPI_LIB_DIR=/opt/vc/lib ..
	make -j4
	sudo make install
	sudo ldconfig