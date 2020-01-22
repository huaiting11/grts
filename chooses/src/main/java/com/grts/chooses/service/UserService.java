package com.grts.chooses.service;


import com.grts.chooses.bean.User;

public interface UserService {
    User findUserById(String userId);

    User findUserAndPass(String telephone, String password);

    String updateUser(User user);

    String saveScore(float score, String carrId, String userId);

    boolean register(String telephone, String password);
}
