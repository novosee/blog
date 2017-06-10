---
layout: page
title: Press Releases
---

<div>
<ul class="alt">  

{% for post in site.categories.press %}
	
	<li> <h3> <a  href='{{ post.eurl }}'>{{ post.title }}</a> </h3>
                  <p >{{ post.date | date_to_long_string }} / by {{ post.author }} <br>
		  {{ post.description }}</p>
        </li>
	
{% endfor %}
</ul>
</div>


