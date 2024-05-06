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
import com.dfoad.GestionDesCoursHybrides.modele.Departement;
import com.dfoad.GestionDesCoursHybrides.service.DepartementService;

@RestController
@RequestMapping("/dfoad/departements")

public class DepartementRestcontoller {

    @Autowired

    private DepartementService departementService;

    @GetMapping(path = "/")
    public List<Departement> lister_departement(){
        return departementService.lister_Departement();
    
    }
    @GetMapping(path = "/departement/{id}")
    public Optional<Departement> lister_undepartement(@PathVariable Long id){
        return departementService.lister_UnDepartement(id);
    
    }
    
    @GetMapping(path = "/{id}")
    public Departement rechercher_departement(@PathVariable Long id){
        return departementService.rechercher_Departement(id);
    }


    @PostMapping(path="/")
    public Departement ajouter_departement(@RequestBody Departement departement){
        return  departementService.ajouter_Departement(departement);
    }

    @PutMapping(path = "/{id}")
    public Departement modifier_departement (@RequestBody Departement departement , @PathVariable Long id){
        return  departementService.modifier_Departement(departement, id);

    }

    @DeleteMapping(path = "/{id}")
    public void supprimer_departement(@PathVariable Long id){
        departementService.supprimer_Departement(id);
    }


    @GetMapping("/{id}/departement")
    public List<Departement> listerDepartementParUfr(@PathVariable Long id) {
        return departementService.listerDepartementParUfr(id);
    }

    @GetMapping("departement/{id}/formation")
    public List<Departement> listerDepartementParFormation(@PathVariable Long id) {
        return departementService.listerDepartementParFormation(id);
    }


    
}