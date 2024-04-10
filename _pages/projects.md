---
layout: single
title: "🚀 Featured Projects"
permalink: /projects/
author_profile: true
classes: wide

summarytools:
  - image_path: assets/images/projects/summarytools-header.png    
    project_url: https://github.com/6chaoran/jupyter-summarytools
    alt: "screenshot of summarytools python package"
    title: "DataFrame Summary Tool in Jupyter Notebook"
    excerpt: |
      Inspired by R summarytools package, I replicated a similar package in Jupyter Notebook. This is python version of summarytools, which is used to generate standardized and comprehensive summary of dataframe in Jupyter Notebooks.
    
      👉 Check [https://pypi.org/project/summarytools](https://pypi.org/project/summarytools) for installation & quick start.
    
      👉 Check [https://github.com/6chaoran/jupyter-summarytools](https://github.com/6chaoran/jupyter-summarytools) for the source code.
        
      👇 Click `Read More` to continue with the post.'
    url: "/visualization/summarytools-for-jupyter-notebook/"
    btn_label: "Read More"
    btn_class: "btn--primary"

sgpr-profiler:
  - image_path: assets/images/projects/sprapp.png   
    project_url: https://spr.ichaoran.com
    alt: "SGPR Profiler webapp screenshot"
    title: "Singapore PR Profile Accessment App"
    excerpt: |
      SGPR Profiler is a profile assessment web app designed to estimate the odds of obtaining PR residency based on voluntarily contributed past records. In this app, users are allowed to view recent application profiles contributed by others. Some high-level insights/statistics are also provided for quick reference.

      👉 Visit the <a href="https://spr.ichaoran.com" target="_blank">link</a> to get started.

      👇 Click `Read More` to continue with the post.
    url: "/visualization/sgprprofile-vue-demo/"
    btn_label: "Read More"
    btn_class: "btn--primary"


sgp1:
  - image_path: assets/images/projects/sgp1.png  
    project_url: https://sgp1.ichaoran.com  
    alt: "SGP1 webapp screenshot"
    title: "Singapore Primary School Registration Companion"
    excerpt: | 
      I know, I know "every primary school is a good school", but kiasu parents still cautiously plan their strategies for their little ones' primary one registration. Some quetisons are appareantly brother the parents. Shall I join the parent voluneer program now to secure the 2B round ? Shall I move to another district that is less competitive in P1 application?
      
      I hope this is the tool, that should provide some number insights to help with your important decisions. Lastly, may your kid goes to the dream school, as you wish!

      👉 Visit the <a href="https://sgp1.ichaoran.com" target="_blank">link</a> to get started.

    # url: ""
    # btn_label: "Read More"
    # btn_class: 'btn--primary'

med-doc-parser:
  - image_path: assets/images/projects/med-doc-parser.png   
    project_url: https://med-doc-parser.ichaoran.com 
    alt: "MedDoc Parser webapp screenshot"
    title: "MedDoc Parser"
    excerpt: | 
      In Singapore, I've noticed a common challenge: our medical lab reports are often still in non-digital formats, making it tough to manage our health data effectively. Inspired by this, I've developed a web app, which allows users to effortlessly convert photos of their medical reports into organized tables, enabling easier analysis of the health history. I'm excited to share this tool, hoping it can help others navigate their health journeys with greater ease.

      👉 Visit the <a href="https://med-doc-parser.ichaoran.com" target="_blank">link</a> to get started.

    # url: ""
    # btn_label: "Read More"
    # btn_class: 'btn--primary'

---
{% include feature_row id="summarytools" type="left" %}
{% include feature_row id="sgpr-profiler" type="left" %}
{% include feature_row id="sgp1" type="left" %}
{% include feature_row id="med-doc-parser" type="left" %}


<style>

  #page-title {
    margin: 20px 0 40px 0;
  }

  .archive__item-teaser {
    /* width: 40%;
    min-width: 380px; */
    border: 1px solid;
    border-radius: 0.5rem;
    max-height: 300px;
    background-position: center;
  }

  /* .archive__item {
    display: flex;
    flex-wrap: wrap
  }



  .archive__item-body {
    margin-left: 1rem;

  }

  .feature__item--left .archive__item-body {
    width: 50%;
    min-width: 380px;

  } */

  .btn--primary {
    background-color: #2f7d95;
  }
</style>