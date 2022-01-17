.PHONY: clean dev
all: clean dev

YARN := yarn

clean:
	rm -rf `find . -name build -not -path "./node_modules/*"`
	rm -rf .cache

dev:
	$(YARN) dev
