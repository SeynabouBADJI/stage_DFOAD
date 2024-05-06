package com.dfoad.GestionDesCoursHybrides.modele;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Ec {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String code;
    private String libelle;
    private Boolean estObligatoire;
    private Integer coefficient;
    private String base;
    private String formuleCalcul;
    private String discipline;

    @JsonIgnore
    @OneToMany(mappedBy = "ec")
    private List<Cours> cours;
    @ManyToOne
    private Ue ue;
    



   
    
}
