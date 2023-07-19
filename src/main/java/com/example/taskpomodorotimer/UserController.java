
package com.example.taskpomodorotimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Add user-related endpoints if needed (e.g., registration, login, etc.)
    @GetMapping("/all")
    public List<User> getAll() {
        return userService.getAll();
    }
}

