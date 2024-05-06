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

import com.dfoad.GestionDesCoursHybrides.modele.Enseignant;
import com.dfoad.GestionDesCoursHybrides.modele.Cours;
import com.dfoad.GestionDesCoursHybrides.service.CoursService;

@RestController
@RequestMapping("/dfoad/courss")

public class CoursRestcontoller {

    @Autowired

    private CoursService coursService;

    @GetMapping(path = "/")
    public List<Cours> lister_cours(){
        return coursService.lister_Cours();
    
    }
    @GetMapping(path = "/cours/{id}")
    public Optional<Cours> lister_uncours(@PathVariable Long id){
        return coursService.lister_UnCours(id);
    
    }
    
    @GetMapping(path = "/{id}")
    public Cours rechercher_cours(@PathVariable Long id){
        return coursService.rechercher_Cours(id);
    }


    @PostMapping(path="/")
    public Cours ajouter_cours(@RequestBody Cours cours){
        return  coursService.ajouter_Cours(cours);
    }

    @PutMapping(path = "/{id}")
    public Cours modifier_cours (@RequestBody Cours cours , @PathVariable Long id){
        return  coursService.modifier_Cours(cours, id);

    }

    @DeleteMapping(path = "/{id}")
    public void supprimer_cours(@PathVariable Long id){
        coursService.supprimer_Cours(id);
    }
    @GetMapping("/ec/{id}")
    public List<Cours> listerCoursParEc(@PathVariable Long id) {
        return coursService.listerCoursParEc(id);
    }


  
    
   
    
}