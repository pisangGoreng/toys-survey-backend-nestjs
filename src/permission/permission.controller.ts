import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async all() {
    const [permissions, permissionsErr] =
      await this.permissionService.findAll();
    if (permissionsErr) throw new BadRequestException(permissionsErr);

    return permissions;
  }
}

/* 
  role: admins
  permissions: all

  role: store_manager
  permissions: all

  role: staff
  permissions: [7, 8, 9, ]
*/

// ! list permission for role
// id name
// 1  view_users
// 2  edit_users
// 3  view_roles
// 4  edit_roles
// 5  view_order_reports
// 6  edit_order_reports
// 7  view_orders
// 8  edit_orders
// 9  view_stores
// 10 edit_stores
