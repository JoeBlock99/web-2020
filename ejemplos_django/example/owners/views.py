import math

from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from owners.models import Owner
from owners.serializers import OwnerSerializer


def evaluar_notify(user, obj, request):
    return user.first_name == obj.owner.name


class OwnerViewSet(viewsets.ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='OwnerPermission',
            permission_configuration={
                'base': {
                    'create': True,
                    'list': True,
                },
                'instance': {
                    'retrieve': 'owners.view_owner',
                    'destroy': True,
                    'update': True,
                    # 'update_permissions': 'users.add_permissions'
                    # 'archive_all_students': phase_user_belongs_to_school,
                    # 'add_clients': True,
                }
            }
        ),
    )



   @action(detail=True, methods=['delete'])
    def delete(self, request, pk=None):
        owner = self.get_object()
        owner.destroy
        return Response({
            'status': 'Done'
        })



