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
import com.dfoad.GestionDesCoursHybrides.modele.Niveau;
import com.dfoad.GestionDesCoursHybrides.modele.Semestre;
import com.dfoad.GestionDesCoursHybrides.service.NiveauService;

@RestController
@RequestMapping("/dfoad/niveaus")

public class NiveauRestcontoller {

    @Autowired

    private NiveauService niveauService;

    @GetMapping(path = "/")
    public List<Niveau> lister_niveau(){
        return niveauService.lister_Niveau();
    
    }
    @GetMapping(path = "/niveau/{id}")
    public Optional<Niveau> lister_unniveau(@PathVariable Long id){
        return niveauService.lister_UnNiveau(id);
    
    }
    
    @GetMapping(path = "/{id}")
    public Niveau rechercher_niveau(@PathVariable Long id){
        return niveauService.rechercher_Niveau(id);
    }


    @PostMapping(path="/")
    public Niveau ajouter_niveau(@RequestBody Niveau niveau){
        return  niveauService.ajouter_Niveau(niveau);
    }

    @PutMapping(path = "/{id}")
    public Niveau modifier_niveau (@RequestBody Niveau niveau , @PathVariable Long id){
        return  niveauService.modifier_Niveau(niveau, id);

    }

    @DeleteMapping(path = "/{id}")
    public void supprimer_niveau(@PathVariable Long id){
        niveauService.supprimer_Niveau(id);
    }
    @GetMapping("/semestre/{id}")
    public List<Niveau> listerNiveauParSemestre(@PathVariable Long id) {
        return niveauService.listerNiveauParSemestre(id);
    }
    @GetMapping("/{id}/niveau")
    public List<Niveau> listerNiveauParFormation(@PathVariable Long id) {
         return niveauService.listerNiveauParFormation(id);
    }
}