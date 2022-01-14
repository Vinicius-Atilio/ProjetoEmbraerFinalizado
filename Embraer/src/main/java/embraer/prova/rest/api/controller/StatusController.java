package embraer.prova.rest.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {

    @GetMapping(path = "/aeronave/status")
    public String check() {
        return "online";
    }

}
