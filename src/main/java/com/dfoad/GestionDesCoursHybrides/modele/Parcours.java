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

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Parcours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String libelle;
    private String type;
    // Indique la relation OneToMany avec ParcoursUe
    @JsonIgnore
    @OneToMany(mappedBy = "parcours")
    private List<ParcoursUe> parcoursUes;
    @ManyToOne
    private Semestre semestre;
   
    
}
