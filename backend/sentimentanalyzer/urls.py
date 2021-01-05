from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
# from django.conf.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/accounts/', include('accounts.urls')),
    path('api/v1/user/', include('users.urls')),
    path('api/v1/', include('datacollector.urls')),
    path('api/v1/', include('collectreviews.urls'))
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
