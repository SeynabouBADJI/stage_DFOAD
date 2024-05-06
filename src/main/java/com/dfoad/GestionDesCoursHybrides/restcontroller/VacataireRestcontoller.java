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
import com.dfoad.GestionDesCoursHybrides.modele.Vacataire;
import com.dfoad.GestionDesCoursHybrides.service.VacataireService;

@RestController
@RequestMapping("/dfoad/vacataires")

public class VacataireRestcontoller {

    @Autowired

    private VacataireService vacataireService;

    @GetMapping(path = "/")
    public List<Vacataire> lister_vacataire(){
        return vacataireService.lister_Vacataire();
    
    }
    @GetMapping(path = "/vacataire/{id}")
    public Optional<Vacataire> lister_unvacataire(@PathVariable Long id){
        return vacataireService.lister_UnVacataire(id);
    
    }
    
    @GetMapping(path = "/{id}")
    public Vacataire rechercher_vacataire(@PathVariable Long id){
        return vacataireService.rechercher_Vacataire(id);
    }


    @PostMapping(path="/")
    public Vacataire ajouter_vacataire(@RequestBody Vacataire vacataire){
        return  vacataireService.ajouter_Vacataire(vacataire);
    }

    @PutMapping(path = "/{id}")
    public Vacataire modifier_vacataire (@RequestBody Vacataire vacataire , @PathVariable Long id){
        return  vacataireService.modifier_Vacataire(vacataire, id);

    }

    @DeleteMapping(path = "/{id}")
    public void supprimer_vacataire(@PathVariable Long id){
        vacataireService.supprimer_Vacataire(id);
    }

}