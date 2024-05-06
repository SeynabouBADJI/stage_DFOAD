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
import com.dfoad.GestionDesCoursHybrides.modele.Semestre;
import com.dfoad.GestionDesCoursHybrides.service.SemestreService;

@RestController
@RequestMapping("/dfoad/semestres")

public class SemestreRestcontoller {

    @Autowired

    private SemestreService semestreService;
   
    @GetMapping(path = "/")
    public List<Semestre> lister_semestre(){
        return semestreService.lister_Semestre();
    
    }
    @GetMapping(path = "/semestre/{id}")
    public Optional<Semestre> lister_unsemestre(@PathVariable Long id){
        return semestreService.lister_UnSemestre(id);
    
    }
    
    @GetMapping(path = "/{id}")
    public Semestre rechercher_semestre(@PathVariable Long id){
        return semestreService.rechercher_Semestre(id);
    }


    @PostMapping(path="/")
    public Semestre ajouter_semestre(@RequestBody Semestre semestre){
        return  semestreService.ajouter_Semestre(semestre);
    }

    @PutMapping(path = "/{id}")
    public Semestre modifier_semestre (@RequestBody Semestre semestre , @PathVariable Long id){
        return  semestreService.modifier_Semestre(semestre, id);

    }

    @DeleteMapping(path = "/{id}")
    public void supprimer_semestre(@PathVariable Long id){
        semestreService.supprimer_Semestre(id);
    }


    
}