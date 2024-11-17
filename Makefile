run:
	cd docs && bundle exec jekyll serve --baseurl=""

clean:
	rm -rf docs/_site docs/.jekyll-cache
	rm docs/Gemfile.lock

setup:
	cd docs && bundle install

discover:
	cd docs && bundle exec jekyll serve --baseurl="" --host="0.0.0.0"

firstrun: setup run