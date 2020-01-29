package com.grts.chooses.service;


import com.grts.chooses.bean.Role;
import com.grts.chooses.bean.User;

import java.util.List;

public interface UserService {
    User findUserById(String userId);

    User findUserAndPass(String telephone, String password);

    String updateUser(User user);

    String saveScore(float score, String carrId, String userId);

    boolean register(String telephone, String password, String nickName);

    List<String> getSchool();

    List<User> getUsers(String schoolName);

    User isTelephone(String telephone);

    User login(String username, String s);

    List<Role> getRoles(String id);
}
