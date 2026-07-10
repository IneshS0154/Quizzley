package com.inkode.quizzleybackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "batches")
public class BatchEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "batch_id")
    private Integer id;

    @Column(name = "batch_name", nullable = false)
    private String batchName;

    @Column(name = "batch_year", nullable = false)
    private Integer batchYear;

    public BatchEntity() {}

    public BatchEntity(String batchName, Integer batchYear) {
        this.batchName = batchName;
        this.batchYear = batchYear;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBatchName() {
        return batchName;
    }

    public void setBatchName(String batchName) {
        this.batchName = batchName;
    }

    public Integer getBatchYear() {
        return batchYear;
    }

    public void setBatchYear(Integer batchYear) {
        this.batchYear = batchYear;
    }
}
