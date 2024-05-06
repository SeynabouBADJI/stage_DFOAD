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
import com.dfoad.GestionDesCoursHybrides.service.FormationService;

@RestController
@RequestMapping("/dfoad/formations")

public class FormationRestcontoller {

    @Autowired

    private FormationService formationService;

    @GetMapping(path = "/")
    public List<Formation> lister_formation(){
        return formationService.lister_Formation();
    
    }
    @GetMapping(path = "/formation/{id}")
    public Optional<Formation> lister_unformation(@PathVariable Long id){
        return formationService.lister_UnFormation(id);
    
    }
    
    @GetMapping(path = "/{id}")
    public Formation rechercher_formation(@PathVariable Long id){
        return formationService.rechercher_Formation(id);
    }


    @PostMapping(path="/")
    public Formation ajouter_formation(@RequestBody Formation formation){
        return  formationService.ajouter_Formation(formation);
    }

    @PutMapping(path = "/{id}")
    public Formation modifier_formation (@RequestBody Formation formation , @PathVariable Long id){
        return  formationService.modifier_Formation(formation, id);

    }

    @DeleteMapping(path = "/{id}")
    public void supprimer_formation(@PathVariable Long id){
        formationService.supprimer_Formation(id);
    }


  

    /* @GetMapping("/domaine/{id}")
    public List<Formation> listerFormationParDomaine(@PathVariable Long id) {
        return formationService.listerFormationParDomaine(id);
    } */
    @GetMapping("/annee/{id}")
    public List<Formation> listerFormationParAnneeScolaire(@PathVariable Long id) {
        return formationService.listerFormationParAnneeScolaire(id);
    }
    @GetMapping("/ufr/{id}")
    public List<Formation> listerFormationParUfr(@PathVariable Long id) {
          return formationService.listerFormationParUfr(id);
    }

    
}