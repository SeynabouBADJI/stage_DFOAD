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

import com.dfoad.GestionDesCoursHybrides.modele.Cours;
import com.dfoad.GestionDesCoursHybrides.modele.Ec;
import com.dfoad.GestionDesCoursHybrides.service.EcService;

@RestController
@RequestMapping("/dfoad/ecs")

public class EcRestcontoller {

    @Autowired

    private EcService ecService;

    @GetMapping(path = "/")
    public List<Ec> lister_ec(){
        return ecService.lister_Ec();
    
    }
    @GetMapping(path = "/ec/{id}")
    public Optional<Ec> lister_unec(@PathVariable Long id){
        return ecService.lister_UnEc(id);
    
    }
    
    @GetMapping(path = "/{id}")
    public Ec rechercher_ec(@PathVariable Long id){
        return ecService.rechercher_Ec(id);
    }


    @PostMapping(path="/")
    public Ec ajouter_ec(@RequestBody Ec ec){
        return  ecService.ajouter_Ec(ec);
    }

    @PutMapping(path = "/{id}")
    public Ec modifier_ec (@RequestBody Ec ec , @PathVariable Long id){
        return  ecService.modifier_Ec(ec, id);

    }

    @DeleteMapping(path = "/{id}")
    public void supprimer_ec(@PathVariable Long id){
        ecService.supprimer_Ec(id);
    }

    @GetMapping("/ue/{id}")
    public List<Ec> listerEcParUe(@PathVariable Long id) {
         return ecService.listerEcParUe(id);
    }

}