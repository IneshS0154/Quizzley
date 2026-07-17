package com.inkode.quizzleybackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "batches", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"batch_name", "batch_year"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Batch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "batch_id")
    private Integer batchId;

    @Column(name = "batch_name", nullable = false, length = 50)
    private String batchName;

    @Column(name = "batch_year", nullable = false)
    private Integer batchYear;
}
