---
layout: page
title: Press Releases
---

<div>
<ul class="alt">
{% for post in site.posts %}
	
	<li> <h4> <a  href='{{site.baseurl}}{{ post.url }}'>{{ post.title }}</a> </h4>
                  <p >{{ post.date | date_to_long_string }} / by {{ post.author }} <br>
		  {{ post.description }}</p>
        </li>
	
{% endfor %}
</ul>
</div>


