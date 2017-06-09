---
layout: page
title: Press Releases
---

<div class='6u 12u$(small)'>
<ul class="alt">
{% for post in site.posts %}
	
	<li>  <a  href='{{site.baseurl}}{{ post.url }}'>{{ post.title }}</a>
                  <p >{{ post.date | date_to_long_string }} / by {{ post.author }} <br>
		  {{ post.description }}</p>
        </li>
	
{% endfor %}
</ul>
</div>


