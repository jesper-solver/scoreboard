package se.scoreboard.data.domain

// Generated Feb 3, 2019 9:58:01 PM by Hibernate Tools 5.2.11.Final

import java.util.*
import javax.persistence.*
import javax.persistence.GenerationType.IDENTITY

/**
 * Organizer generated by hbm2java
 */
@Entity
@Table(name = "organizer")
class Organizer : java.io.Serializable {

    @get:Id
    @get:GeneratedValue(strategy = IDENTITY)
    @get:Column(name = "id", unique = true, nullable = false)
    var id: Int? = null

    @get:Column(name = "name", nullable = false, length = 32)
    var name: String? = null

    @get:Column(name = "homepage", length = 256)
    var homepage: String? = null

    @get:OneToMany(fetch = FetchType.LAZY, mappedBy = "organizer")
    var contests: Set<Contest> = HashSet(0)

    @get:ManyToMany(fetch = FetchType.LAZY)
    @get:JoinTable(name = "user_organizer", catalog = "scoreboard", joinColumns = arrayOf(JoinColumn(name = "organizer_id", nullable = false, updatable = false)), inverseJoinColumns = arrayOf(JoinColumn(name = "user_id", nullable = false, updatable = false)))
    var users: Set<User> = HashSet(0)

    constructor()

    constructor(name: String) {
        this.name = name
    }

    constructor(name: String, homepage: String, contests: Set<Contest>, users: Set<User>) {
        this.name = name
        this.homepage = homepage
        this.contests = contests
        this.users = users
    }

}