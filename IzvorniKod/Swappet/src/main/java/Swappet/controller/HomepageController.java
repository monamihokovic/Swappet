package Swappet.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomepageController {

    @RequestMapping("/homepage")
    public String home(){
        return "Shadow, it's me, the DEVIL";
    }

}
