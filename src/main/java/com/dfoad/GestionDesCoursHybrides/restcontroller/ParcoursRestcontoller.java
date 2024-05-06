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

import com.dfoad.GestionDesCoursHybrides.modele.ParcoursUe;
import com.dfoad.GestionDesCoursHybrides.modele.Parcours;
import com.dfoad.GestionDesCoursHybrides.service.ParcoursService;

@RestController
@RequestMapping("/dfoad/parcourss")

public class ParcoursRestcontoller {

    @Autowired

    private ParcoursService parcoursService;

    @GetMapping(path = "/")
    public List<Parcours> lister_parcours(){
        return parcoursService.lister_Parcours();
    
    }
    @GetMapping(path = "/parcours/{id}")
    public Optional<Parcours> lister_unparcours(@PathVariable Long id){
        return parcoursService.lister_UnParcours(id);
    
    }
    
    @GetMapping(path = "/{id}")
    public Parcours rechercher_parcours(@PathVariable Long id){
        return parcoursService.rechercher_Parcours(id);
    }


    @PostMapping(path="/")
    public Parcours ajouter_parcours(@RequestBody Parcours parcours){
        return  parcoursService.ajouter_Parcours(parcours);
    }

    @PutMapping(path = "/{id}")
    public Parcours modifier_parcours (@RequestBody Parcours parcours , @PathVariable Long id){
        return  parcoursService.modifier_Parcours(parcours, id);

    }

    @DeleteMapping(path = "/{id}")
    public void supprimer_parcours(@PathVariable Long id){
        parcoursService.supprimer_Parcours(id);
    }

    @GetMapping("/semestre/{id}")
    public List<Parcours> listerParcoursParSemestre(@PathVariable Long id) {
        return parcoursService.listerParcoursParSemestre(id);
    } 



    
}