---
layout: page
title: Art & Design
---

<div>
<ul class="alt">
{% for post in site.posts %}
	
	<li> <h3> <a  href='{{site.baseurl}}{{ post.url }}'>{{ post.title }}</a> </h3>
                  <p >{{ post.date | date_to_long_string }} / by {{ post.author }} <br>
		  {{ post.description }}</p>
        </li>
	
{% endfor %}
</ul>
</div>


