run:
	cd docs && bundle exec jekyll serve

clean:
	rm -rf docs/_site docs/.jekyll-cache
	rm docs/Gemfile.lock

setup:
	cd docs && bundle install