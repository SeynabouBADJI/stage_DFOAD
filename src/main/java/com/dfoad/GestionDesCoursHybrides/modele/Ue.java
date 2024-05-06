package com.dfoad.GestionDesCoursHybrides.modele;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Ue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String code;
    private String libelle;
    private String base;
    @JsonIgnore
    @OneToMany(mappedBy = "ue")
    private List<Ec> ecs;
    @JsonIgnore
    @OneToMany(mappedBy = "ue")
    private List<ParcoursUe> parcoursUes;
   
    



   
    
}
