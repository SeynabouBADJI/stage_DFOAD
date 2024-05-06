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

import com.dfoad.GestionDesCoursHybrides.modele.Formation;
import com.dfoad.GestionDesCoursHybrides.modele.AnneeScolaire;
import com.dfoad.GestionDesCoursHybrides.service.AnneeScolaireService;

@RestController
@RequestMapping("/dfoad/anneeScolaires")

public class AnneeScolaireRestcontoller {

    @Autowired

    private AnneeScolaireService anneeScolaireService;

    @GetMapping(path = "/")
    public List<AnneeScolaire> lister_anneeScolaire(){
        return anneeScolaireService.lister_AnneeScolaire();
    
    }
    @GetMapping(path = "/anneeScolaire/{id}")
    public Optional<AnneeScolaire> lister_unanneeScolaire(@PathVariable Long id){
        return anneeScolaireService.lister_UnAnneeScolaire(id);
    
    }
    
    @GetMapping(path = "/{id}")
    public AnneeScolaire rechercher_anneeScolaire(@PathVariable Long id){
        return anneeScolaireService.rechercher_AnneeScolaire(id);
    }


    @PostMapping(path="/")
    public AnneeScolaire ajouter_anneeScolaire(@RequestBody AnneeScolaire anneeScolaire){
        return  anneeScolaireService.ajouter_AnneeScolaire(anneeScolaire);
    }

    @PutMapping(path = "/{id}")
    public AnneeScolaire modifier_anneeScolaire (@RequestBody AnneeScolaire anneeScolaire , @PathVariable Long id){
        return  anneeScolaireService.modifier_AnneeScolaire(anneeScolaire, id);

    }

    @DeleteMapping(path = "/{id}")
    public void supprimer_anneeScolaire(@PathVariable Long id){
        anneeScolaireService.supprimer_AnneeScolaire(id);
    }

  
    
}