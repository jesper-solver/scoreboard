package se.scoreboard.model

data class Problem(
        val id: Int,
        val color: String,
        val textColor : String,
        val colorName:String,
        val points : Int,
        val text :String
)