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
import com.dfoad.GestionDesCoursHybrides.modele.Titulaire;
import com.dfoad.GestionDesCoursHybrides.service.TitulaireService;

@RestController
@RequestMapping("/dfoad/titulaires")

public class TitulaireRestcontoller {

    @Autowired

    private TitulaireService titulaireService;

    @GetMapping(path = "/")
    public List<Titulaire> lister_titulaire(){
        return titulaireService.lister_Titulaire();
    
    }
    @GetMapping(path = "/titulaire/{id}")
    public Optional<Titulaire> lister_untitulaire(@PathVariable Long id){
        return titulaireService.lister_UnTitulaire(id);
    
    }
    
    @GetMapping(path = "/{id}")
    public Titulaire rechercher_titulaire(@PathVariable Long id){
        return titulaireService.rechercher_Titulaire(id);
    }


    @PostMapping(path="/")
    public Titulaire ajouter_titulaire(@RequestBody Titulaire titulaire){
        return  titulaireService.ajouter_Titulaire(titulaire);
    }

    @PutMapping(path = "/{id}")
    public Titulaire modifier_titulaire (@RequestBody Titulaire titulaire , @PathVariable Long id){
        return  titulaireService.modifier_Titulaire(titulaire, id);

    }

    @DeleteMapping(path = "/{id}")
    public void supprimer_titulaire(@PathVariable Long id){
        titulaireService.supprimer_Titulaire(id);
    }
}