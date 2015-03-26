from django.conf.urls import patterns, include, url
from django.contrib import admin
from SpartahackVis import settings

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'SpartahackVis.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'Visualization.views.index'),
    url(r'^esi232.html$', 'Visualization.views.table', name='table'),
	url(r'^rsvp.html$', 'Visualization.views.rsvp', name='rspv'),
	url(r'^cool.html$', 'Visualization.views.cool', name='cool'),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_URL, 'show_indexes': True})
)
