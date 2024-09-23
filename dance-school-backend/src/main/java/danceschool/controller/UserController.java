package danceschool.controller;

import danceschool.model.User;
import danceschool.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(Authentication authentication) {
        logger.info("Получен запрос на профиль пользователя");
        if (authentication == null) {
            logger.error("Authentication is null");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }
        User user = userService.findByUsername(authentication.getName());
        if (user == null) {
            logger.error("User not found: {}", authentication.getName());
            return ResponseEntity.notFound().build();
        }
        logger.info("Профиль пользователя успешно загружен: {}", user.getUsername());
        return ResponseEntity.ok(user);
    }
}

