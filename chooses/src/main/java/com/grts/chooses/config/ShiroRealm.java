package com.grts.chooses.config;


import com.grts.chooses.bean.Role;
import com.grts.chooses.bean.User;
import com.grts.chooses.service.UserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ShiroRealm extends AuthorizingRealm {
    @Autowired
    UserService userService;
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        UsernamePasswordToken upToken = (UsernamePasswordToken) token;
        // 取出表单用户名
        String username =(String) token.getPrincipal();
        String password = new String((char[]) token.getCredentials());
        User user = userService.findUserAndPass(upToken.getUsername(), new String(upToken.getPassword()));
        // 传入:用户名,加密后的密码,盐值,该realm的名字，加密算法和加密次数在已经在配置文件中指定
        String md5 = new Md5Hash(password).toHex();
        SimpleAuthenticationInfo info =   new SimpleAuthenticationInfo(user, md5, getName());
        return info;
    }
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        User user = (User) principalCollection.getPrimaryPrincipal();
        //根据用户名去数据库查询用户信息
        //添加角色和权限
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        List<Role>  roles = userService.getRoles(user.getId());
        for (Role role : roles) {
            //添加角色
            simpleAuthorizationInfo.addRole(role.getName());
            //添加权限
            /*for (Permissions permissions : role.getPermissions()) {
                simpleAuthorizationInfo.addStringPermission(permissions.getPermissionsName());
            }*/
        }
        return simpleAuthorizationInfo;
    }


}
