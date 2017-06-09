---
layout: page
title: Press Releases
---

<div class='6u 12u$(small)'>
{% for post in site.posts %}
	<ul class="alt">
						<li>  <a  href='{{site.baseurl}}{{ post.url }}'>{{ post.title }}</a>
                  <p >{{ post.date | date_to_long_string }} / by {{ post.author }}</p>
            </li>
	</ul>
{% endfor %}
</div>


