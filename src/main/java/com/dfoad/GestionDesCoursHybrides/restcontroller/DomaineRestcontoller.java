/* package com.dfoad.GestionDesCoursHybrides.restcontroller;
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

import com.dfoad.GestionDesCoursHybrides.modele.Formation;
import com.dfoad.GestionDesCoursHybrides.modele.Domaine;
import com.dfoad.GestionDesCoursHybrides.service.DomaineService;

@RestController
@RequestMapping("/dfoad/domaines")

public class DomaineRestcontoller {

    @Autowired

    private DomaineService domaineService;

    @GetMapping(path = "/")
    public List<Domaine> lister_domaine(){
        return domaineService.lister_Domaine();
    
    }
    @GetMapping(path = "/domaine/{id}")
    public Optional<Domaine> lister_undomaine(@PathVariable Long id){
        return domaineService.lister_UnDomaine(id);
    
    }
    
    @GetMapping(path = "/{id}")
    public Domaine rechercher_domaine(@PathVariable Long id){
        return domaineService.rechercher_Domaine(id);
    }


    @PostMapping(path="/")
    public Domaine ajouter_domaine(@RequestBody Domaine domaine){
        return  domaineService.ajouter_Domaine(domaine);
    }

    @PutMapping(path = "/{id}")
    public Domaine modifier_domaine (@RequestBody Domaine domaine , @PathVariable Long id){
        return  domaineService.modifier_Domaine(domaine, id);

    }

    @DeleteMapping(path = "/{id}")
    public void supprimer_domaine(@PathVariable Long id){
        domaineService.supprimer_Domaine(id);
    }

   
    
} */