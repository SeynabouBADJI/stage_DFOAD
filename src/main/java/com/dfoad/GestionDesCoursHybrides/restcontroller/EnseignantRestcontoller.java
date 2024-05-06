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

import com.dfoad.GestionDesCoursHybrides.modele.Contrat;
import com.dfoad.GestionDesCoursHybrides.modele.Enseignant;
import com.dfoad.GestionDesCoursHybrides.service.EnseignantService;

@RestController
@RequestMapping("/dfoad/enseignants")

public class EnseignantRestcontoller {

    @Autowired

    private EnseignantService enseignantService;
    @GetMapping(path = "/")
    public List<Enseignant> lister_enseignant(){
        return enseignantService.lister_Enseignant();
    
    }
    @GetMapping(path = "/enseignant/{id}")
    public Optional<Enseignant> lister_unenseignant(@PathVariable Long id){
        return enseignantService.lister_UnEnseignant(id);
    
    }
    
    @GetMapping(path = "/{id}")
    public Enseignant rechercher_enseignant(@PathVariable Long id){
        return enseignantService.rechercher_Enseignant(id);
    }


    @PostMapping(path="/")
    public Enseignant ajouter_enseignant(@RequestBody Enseignant enseignant){
        return  enseignantService.ajouter_Enseignant(enseignant);
    }

    @PutMapping(path = "/{id}")
    public Enseignant modifier_enseignant (@RequestBody Enseignant enseignant , @PathVariable Long id){
        return  enseignantService.modifier_Enseignant(enseignant, id);

    }

    @DeleteMapping(path = "/{id}")
    public void supprimer_enseignant(@PathVariable Long id){
        enseignantService.supprimer_Enseignant(id);
    }


    @GetMapping("/cours/{id}")
    public List<Enseignant> listerEnseignantParCours(@PathVariable Long id) {
        return enseignantService.listerEnseignantParCours(id);
    }

     
}