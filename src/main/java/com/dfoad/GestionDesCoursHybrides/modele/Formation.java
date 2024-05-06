package com.dfoad.GestionDesCoursHybrides.modele;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private Integer numero;
    private String grade;
    private String libelle;
    private String mention;
    private String specialite;
    private Boolean estValide;
    @JsonIgnore
    @OneToMany(mappedBy = "formation")
    private List<Niveau> niveau;
   /*  @ManyToOne
    private Domaine domaine; */
    @ManyToOne
    private AnneeScolaire anneeScolaire;
    @ManyToMany
    @JoinTable(
        name = "departement_formation",
        joinColumns = @JoinColumn(name = "formation_id"),
        inverseJoinColumns = @JoinColumn(name = "departement_id")
    )
    private List<Departement> departements; 
    
}
