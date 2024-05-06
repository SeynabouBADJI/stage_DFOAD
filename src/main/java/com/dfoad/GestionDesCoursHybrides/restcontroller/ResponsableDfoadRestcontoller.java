package com.dfoad.GestionDesCoursHybrides.restcontroller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.dfoad.GestionDesCoursHybrides.modele.ResponsableDfoad;
import com.dfoad.GestionDesCoursHybrides.service.ResponsableDfoadService;

@RestController
@RequestMapping("/dfoad/responsableDfoads")

public class ResponsableDfoadRestcontoller {

    @Autowired

    private ResponsableDfoadService responsableDfoadService;

    @GetMapping(path = "/")
    public List<ResponsableDfoad> lister_responsableDfoad(){
        return responsableDfoadService.lister_ResponsableDfoad();
    
    }
    @GetMapping(path = "/responsableDfoad/{id}")
    public Optional<ResponsableDfoad> lister_unresponsableDfoad(@PathVariable Long id){
        return responsableDfoadService.lister_UnResponsableDfoad(id);
    
    }
    
    @GetMapping(path = "/{id}")
    public ResponsableDfoad rechercher_responsableDfoad(@PathVariable Long id){
        return responsableDfoadService.rechercher_ResponsableDfoad(id);
    }


    @PostMapping(path="/")
    public ResponsableDfoad ajouter_responsableDfoad(@RequestBody ResponsableDfoad responsableDfoad){
        return  responsableDfoadService.ajouter_ResponsableDfoad(responsableDfoad);
    }

    @PutMapping(path = "/{id}")
    public ResponsableDfoad modifier_responsableDfoad (@RequestBody ResponsableDfoad responsableDfoad , @PathVariable Long id){
        return  responsableDfoadService.modifier_ResponsableDfoad(responsableDfoad, id);

    }

    @DeleteMapping(path = "/{id}")
    public void supprimer_responsableDfoad(@PathVariable Long id){
        responsableDfoadService.supprimer_ResponsableDfoad(id);
    }

 
    
}